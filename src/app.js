import { ABILITIES, BattleEngine } from "./core/battle-engine.js";
import { canStartWithPackages, isPlayableUserPack } from "./core/content-access.js";
import { QuestionRepository } from "./core/question-repository.js";
import { validateQuestionPack } from "./core/question-validator.js";
import { REGIONS, getRegion } from "./config/regions.js";
import { AudioManager } from "./services/audio-manager.js";
import { SaveService } from "./services/save-service.js";

const app = document.querySelector("#app");
const profileChip = document.querySelector("#profile-chip");
const toastElement = document.querySelector("#toast");
const save = new SaveService();
save.data.packages = save.data.packages.filter(isPlayableUserPack);
if (!save.data.packages.some((pack) => pack.package_id === save.data.campaign.packageId)) {
  save.data.campaign.packageId = save.data.packages[0]?.package_id || null;
}
save.persist();
const audio = new AudioManager(save.data.settings);
const MAIN_THEME = "assets/music/Duelo do Saber - Main Theme.mp3";
let battle = null;
let importReport = null;
let pendingPack = null;
let toastTimer;

const html = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
const difficultyName = { easy: "Fácil", medium: "Médio", hard: "Difícil" };
const modeName = { campaign: "Campanha", quick: "Duelo Rápido", review: "Revisão" };

function setView(content, theme = "menu") {
  document.body.dataset.theme = theme;
  app.innerHTML = content;
  profileChip.textContent = `${save.data.profile.name} • Nv. ${save.data.profile.level} • ${save.data.profile.coins} moedas`;
  app.focus({ preventScroll: true });
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastElement.textContent = message;
  toastElement.classList.add("show");
  toastTimer = setTimeout(() => toastElement.classList.remove("show"), 2800);
}

function applySettings() {
  const settings = save.data.settings;
  document.documentElement.style.setProperty("--text-scale", settings.textScale);
  document.body.classList.toggle("high-contrast", settings.highContrast);
  document.body.classList.toggle("reduced-motion", settings.reducedMotion);
  audio.setVolume(settings.music);
}

function selectedPackage() {
  return save.data.packages.find((pack) => pack.package_id === save.data.campaign.packageId) || save.data.packages[0];
}

function hasImportedPack() {
  return canStartWithPackages(save.data.packages);
}

function requireImportedPack() {
  showToast("Importe e valide uma matéria própria antes de começar a jogar.");
  forge();
}

function findQuestion(questionId) {
  for (const pack of save.data.packages) {
    const question = pack.questions.find((item) => item.id === questionId);
    if (question) return question;
  }
  return null;
}

function menu() {
  battle = null;
  audio.play(MAIN_THEME);
  const completed = Object.keys(save.data.campaign.completed).length;
  const ready = hasImportedPack();
  setView(`
    <section class="hero">
      <div>
        <p class="eyebrow">Um jogo de cartas para aprender, revisar e vencer</p>
        <h1>Duelo <span>do Saber</span></h1>
        <p class="hero__lead">Seu conhecimento se transforma em cartas. Enfrente cinco duelistas, aprenda com cada erro e conquiste a Cidadela do Eclipse — sem pressa e sem respostas gratuitas.</p>
        ${ready ? "" : `<p class="import-gate"><strong>Primeiro passo:</strong> importe suas próprias matérias na Forja do Conhecimento para liberar os duelos.</p>`}
        <div class="hero__actions">
          ${ready ? `<button class="btn btn--primary" data-action="campaign">${completed ? "Continuar campanha" : "Começar campanha"}</button><button class="btn btn--gold" data-action="quick">Duelo rápido</button>` : `<button class="btn btn--primary" data-action="forge">Importar minhas matérias</button><button class="btn" data-action="forge">Como começar</button>`}
        </div>
        <div class="menu-grid" aria-label="Outras áreas">
          ${menuTile("⌁", "Forja do Conhecimento", "Importe e valide seus pacotes", "forge")}
          ${menuTile("♢", "Baralho das Fraquezas", `${Object.keys(save.data.weaknesses).length} questões em revisão`, "weaknesses")}
          ${menuTile("⌁", "Estatísticas", "Acompanhe seu domínio", "stats")}
          ${menuTile("✧", "Coleção", `${save.data.rewards.length} recompensas`, "collection")}
          ${menuTile("⚙", "Configurações", "Áudio, texto e conforto", "settings")}
        </div>
      </div>
    </section>
  `);
}

function menuTile(icon, title, description, action) {
  return `<button class="menu-tile" data-action="${action}"><span class="menu-tile__icon">${icon}</span><span><strong>${title}</strong><small>${description}</small></span></button>`;
}

function campaign() {
  if (!hasImportedPack()) return requireImportedPack();
  audio.play(MAIN_THEME);
  const pack = selectedPackage();
  setView(`
    ${viewHead("Mapa da campanha", "Vença cada duelista para abrir o próximo caminho.")}
    <section class="panel" aria-label="Configuração da campanha">
      <div class="form-grid">
        <div class="field"><label for="campaign-pack">Pacote de perguntas</label><select id="campaign-pack" data-setting="campaign-package">${save.data.packages.map((item) => `<option value="${html(item.package_id)}" ${item.package_id === pack?.package_id ? "selected" : ""}>${html(item.title)} • ${item.questions.length} questões</option>`).join("")}</select></div>
        <div class="field"><label for="campaign-difficulty">Dificuldade de combate</label><select id="campaign-difficulty" data-setting="campaign-difficulty">${difficultyOptions(save.data.campaign.difficulty)}</select></div>
      </div>
      <p class="muted" style="margin:1rem 0 0">A dificuldade de combate altera somente o dano dos erros. A dificuldade das perguntas acompanha cada região.</p>
    </section>
    <section class="region-map" aria-label="Cinco regiões do MVP">
      ${REGIONS.map(regionCard).join("")}
    </section>
  `);
}

function regionCard(region) {
  const locked = region.order > save.data.campaign.unlocked;
  const completed = Boolean(save.data.campaign.completed[region.id]);
  const pack = selectedPackage();
  const suitable = pack?.questions.filter((question) => region.difficulties.includes(question.difficulty)).length || 0;
  const reduced = suitable < 8;
  return `<article class="region-card ${locked ? "locked" : ""} ${completed ? "completed" : ""}" data-icon="${region.icon}" style="--card-accent:${regionColor(region.theme)}">
    <div>
      <span class="region-card__number">REGIÃO ${region.order} ${completed ? "• CONCLUÍDA" : locked ? "• BLOQUEADA" : "• DISPONÍVEL"}</span>
      <h2>${html(region.name)}</h2>
      <div class="rival-medallion">${html(region.rival.portrait)}</div>
      <h3>${html(region.rival.name)}</h3>
      <p>${html(region.rival.title)} • ${region.rival.age} anos</p>
      <div class="tags"><span class="tag">${region.difficulties.map((item) => difficultyName[item]).join(" / ")}</span><span class="tag">${suitable} questões adequadas</span></div>
      ${reduced && !locked ? `<p class="danger" style="margin-top:.7rem">Conteúdo reduzido: perguntas poderão se repetir.</p>` : ""}
    </div>
    <div>
      <p><span class="gold">Recompensa:</span> ${html(region.reward)}</p>
      <button class="btn ${completed ? "" : "btn--primary"}" data-action="start-campaign" data-region="${region.id}" ${locked ? "disabled" : ""}>${locked ? "Caminho selado" : completed ? "Duelar novamente" : reduced ? "Iniciar modo reduzido" : "Entrar na região"}</button>
      <button class="btn btn--small" data-action="rival-info" data-region="${region.id}" ${locked ? "disabled" : ""}>Conhecer duelista</button>
    </div>
  </article>`;
}

function regionColor(theme) {
  return { aurora: "#9de98f", crystal: "#75dff6", celestial: "#d5d8ff", forge: "#ff9855", eclipse: "#c789ff" }[theme];
}

function rivalInfo(regionId) {
  const region = getRegion(regionId);
  setView(`
    ${viewHead(region.rival.name, `${region.rival.title} • ${region.name}`)}
    <section class="panel character-sheet">
      <div class="rival-medallion" style="--card-accent:${regionColor(region.theme)}">${html(region.rival.portrait)}</div>
      <div>
        <p class="eyebrow">Conceito inicial de personagem</p>
        <h2>${html(region.rival.archetype)} • ${region.rival.age} anos</h2>
        <p><strong>Visual inicial:</strong> ${html(region.rival.concept)}</p>
        <p><strong>Personalidade:</strong> ${html(region.rival.personality)}</p>
        <p class="gold">“${html(region.rival.intro)}”</p>
        <div class="tags">${region.styles.slice(0, 5).map((style) => `<span class="tag">${html(style)}</span>`).join("")}</div>
        <div class="button-row"><button class="btn btn--primary" data-action="start-campaign" data-region="${region.id}">Iniciar duelo</button><button class="btn" data-action="campaign">Voltar ao mapa</button></div>
      </div>
    </section>
  `, region.theme);
  audio.play(region.track);
}

function quick() {
  if (!hasImportedPack()) return requireImportedPack();
  audio.play(MAIN_THEME);
  setView(`
    ${viewHead("Duelo rápido", "Escolha qualquer rival e treine sem alterar os desbloqueios da campanha.")}
    <section class="panel">
      <div class="form-grid">
        <div class="field"><label for="quick-region">Região e rival</label><select id="quick-region">${REGIONS.map((region) => `<option value="${region.id}">${region.name} — ${region.rival.name}</option>`).join("")}</select></div>
        <div class="field"><label for="quick-pack">Pacote</label><select id="quick-pack">${save.data.packages.map((pack) => `<option value="${html(pack.package_id)}">${html(pack.title)} • ${pack.questions.length} questões</option>`).join("")}</select></div>
        <div class="field"><label for="quick-difficulty">Dificuldade de combate</label><select id="quick-difficulty">${difficultyOptions("medium")}</select></div>
      </div>
      <div class="button-row"><button class="btn btn--primary" data-action="start-quick">Preparar duelo</button></div>
    </section>
  `);
}

function startDuel(region, mode, pack, difficulty, questions = pack?.questions || []) {
  if (mode !== "review" && !save.data.packages.some((item) => item.package_id === pack?.package_id && isPlayableUserPack(item))) return requireImportedPack();
  if (!region || !questions.length) return showToast("Não há perguntas disponíveis para este duelo.");
  battle = {
    region,
    mode,
    pack,
    engine: new BattleEngine(difficulty),
    repository: new QuestionRepository(questions, Date.now()),
    question: null,
    selected: null,
    eliminated: new Set(),
    hint: "",
    lastResult: null
  };
  battle.question = battle.repository.next(region);
  audio.play(region.track);
  renderBattle();
}

function renderBattle() {
  const { region, engine, question } = battle;
  const rivalLine = engine.rivalHp <= 4000 ? region.rival.lowHealth : region.rival.intro;
  const correct = question.alternatives.find((item) => item.id === question.correct_alternative);
  setView(`
    <section class="battle">
      <div class="battle-top panel">
        <div class="fighter fighter--player"><div class="fighter__portrait">DS</div><div><strong>${html(save.data.profile.name)}</strong><small>${engine.playerHp.toLocaleString("pt-BR")} / 8.000 PV</small><div class="hp"><div class="hp__fill" style="width:${engine.playerHp / 80}%"></div></div></div></div>
        <span class="versus">VS</span>
        <div class="fighter fighter--rival"><div><strong>${html(region.rival.name)}</strong><small>${engine.rivalHp.toLocaleString("pt-BR")} / 8.000 PV</small><div class="hp"><div class="hp__fill" style="width:${engine.rivalHp / 80}%"></div></div></div><div class="fighter__portrait">${html(region.rival.portrait)}</div></div>
      </div>
      <p class="rival-line">“${html(rivalLine)}”</p>
      <article class="question-card">
        <div class="tags" style="justify-content:center"><span class="tag">${html(question.subject)}</span><span class="tag">${html(question.topic)}</span><span class="tag">${difficultyName[question.difficulty]}</span></div>
        <h1>${html(question.prompt)}</h1>
        ${battle.hint ? `<p class="gold" style="margin:1rem 0 0"><strong>Dica:</strong> ${html(battle.hint)}</p>` : ""}
      </article>
      <div class="battle-grid">
        <aside class="ability-bar" aria-label="Habilidades">
          <div class="energy"><strong>Energia do Saber</strong><div class="energy__pips">${[1,2,3,4,5].map((pip) => `<span class="energy__pip ${pip <= engine.energy ? "filled" : ""}"></span>`).join("")}</div></div>
          ${Object.entries(ABILITIES).map(([id, ability]) => `<button class="ability" data-action="ability" data-ability="${id}" ${engine.energy < ability.cost || engine.uses[id] >= ability.limit || (id === "hint" && !question.hint) ? "disabled" : ""}><strong>${html(ability.name)}</strong><small>${ability.cost} energia • ${engine.uses[id]}/${ability.limit} usos</small></button>`).join("")}
        </aside>
        <div class="cards" role="list" aria-label="Cinco Cartas-Resposta">
          ${question.alternatives.map((alternative, index) => `<button class="answer-card ${battle.selected === alternative.id ? "selected" : ""} ${battle.eliminated.has(alternative.id) ? "eliminated" : ""}" data-action="select-answer" data-answer="${alternative.id}" ${battle.eliminated.has(alternative.id) ? "disabled" : ""} role="listitem" aria-pressed="${battle.selected === alternative.id}"><span class="answer-card__letter">${alternative.id}</span><span class="answer-card__key">tecla ${index + 1}</span><strong>${html(alternative.card_name)}</strong><p>${html(alternative.description)}</p></button>`).join("")}
        </div>
        <div class="confirm-bar"><div><span class="combo">${engine.combo || "Escolha uma carta e confirme"}</span><small class="muted" style="display:block">${battle.selected ? `Carta ${battle.selected} selecionada` : "Tempo ilimitado • use 1–5 no teclado"}</small></div><div class="button-row" style="margin:0"><button class="btn" data-action="pause">Sair do duelo</button><button class="btn btn--primary" data-action="confirm-answer" ${battle.selected ? "" : "disabled"}>Confirmar jogada</button></div></div>
      </div>
    </section>
    ${battle.lastResult ? resultOverlay(battle.lastResult, question, correct) : ""}
  `, region.theme);
}

function resultOverlay(result, question, correct) {
  const selected = question.alternatives.find((item) => item.id === result.selected);
  const ended = battle.engine.status !== "active";
  return `<div class="result-overlay" role="dialog" aria-modal="true" aria-labelledby="result-title"><section class="result-dialog panel">
    <div class="result-mark ${result.isCorrect ? "success" : "danger"}">${result.isCorrect ? "✓" : "×"}</div>
    <h2 id="result-title">${result.isCorrect ? "Resposta correta" : "Resposta incorreta"}</h2>
    <div class="result-dialog__answers"><div class="answer-summary"><small>Sua escolha</small><strong>${html(selected?.id)} — ${html(selected?.card_name)}</strong></div><div class="answer-summary"><small>Alternativa correta</small><strong>${html(correct?.id)} — ${html(correct?.card_name)}</strong></div></div>
    <p>${html(question.correct_explanation)}</p>
    ${!result.isCorrect && selected?.explanation ? `<p class="muted"><strong>Sobre sua escolha:</strong> ${html(selected.explanation)}</p>` : ""}
    ${question.source_reference ? `<p class="muted"><strong>Referência:</strong> ${html(question.source_reference)}</p>` : ""}
    <div class="button-row"><button class="btn" data-action="flag-question" data-question="${html(question.id)}">Marcar como dúvida</button><button class="btn btn--primary" data-action="continue-battle">${ended ? "Ver resultado do duelo" : "Próxima rodada"}</button></div>
  </section></div>`;
}

function resolveAnswer() {
  if (!battle?.selected || battle.lastResult) return;
  try {
    const result = battle.engine.resolveAnswer(battle.question, battle.selected);
    if (result.secondChance) {
      battle.eliminated.add(battle.selected);
      battle.selected = null;
      showToast("Segunda Chance ativada: escolha uma carta diferente. Nenhum dano foi aplicado.");
      renderBattle();
      return;
    }
    save.recordAnswer({ question: battle.question, selected: battle.selected, correct: result.isCorrect, mode: battle.mode, regionId: battle.region.id });
    audio.effect(result.isCorrect ? "correct" : "wrong");
    battle.lastResult = { ...result, selected: battle.selected };
    renderBattle();
  } catch (error) {
    showToast(error.message);
  }
}

function useAbility(id) {
  if (!battle || battle.lastResult) return;
  try {
    const effect = battle.engine.useAbility(id, battle.question);
    if (effect.eliminated) battle.eliminated.add(effect.eliminated);
    if (effect.hint) battle.hint = effect.hint;
    if (effect.skipped) {
      save.flagQuestion(battle.question.id);
      nextQuestion();
      showToast("Pergunta adiada e adicionada ao Baralho das Fraquezas.");
      return;
    }
    save.persist();
    audio.effect("ability");
    renderBattle();
    showToast(`${ABILITIES[id].name} ativada.`);
  } catch (error) {
    showToast(error.message);
  }
}

function nextQuestion() {
  if (battle.engine.status !== "active") return duelResult();
  battle.question = battle.repository.next(battle.region);
  battle.selected = null;
  battle.eliminated = new Set();
  battle.hint = "";
  battle.lastResult = null;
  renderBattle();
}

function duelResult() {
  const snapshot = battle.engine.snapshot();
  const won = snapshot.status === "won";
  const result = save.finishDuel(battle.region, snapshot, won, battle.mode);
  const reward = won && battle.mode === "campaign" ? battle.region.reward : "Experiência de duelista";
  setView(`
    <section class="panel" style="max-width:980px;margin:0 auto;text-align:center">
      <p class="eyebrow">${modeName[battle.mode]}</p>
      <div class="result-mark ${won ? "success" : "danger"}">${won ? "✦" : "×"}</div>
      <h1>${won ? "Vitória conquistada" : "O saber pede uma revanche"}</h1>
      <p class="muted">${won ? html(battle.region.rival.defeat) : "Seus acertos foram preservados e seus erros já estão preparados para revisão."}</p>
      <div class="grid-3" style="margin:2rem 0;text-align:left">
        ${statCard(snapshot.presented, "Perguntas")}${statCard(snapshot.correct, "Acertos")}${statCard(snapshot.wrong, "Erros")}${statCard(`${result.accuracy}%`, "Precisão")}${statCard(snapshot.bestStreak, "Maior sequência")}${statCard(snapshot.playerHp.toLocaleString("pt-BR"), "PV restante")}
      </div>
      <p><span class="gold">Recompensa:</span> ${html(reward)}</p>
      <div class="button-row" style="justify-content:center"><button class="btn btn--primary" data-action="${battle.mode === "campaign" ? "campaign" : battle.mode === "review" ? "weaknesses" : "quick"}">Continuar</button><button class="btn" data-action="menu">Menu principal</button></div>
    </section>
  `, battle.region.theme);
}

function forge() {
  audio.play(MAIN_THEME);
  setView(`
    ${viewHead("Forja do Conhecimento", "Transforme seu material em um pacote validado e jogável.")}
    <div class="grid-2">
      <section class="panel">
        <p class="eyebrow">1. Gere o conteúdo</p><h2>Prompt oficial</h2>
        <p class="muted">Copie o contrato oficial, envie-o junto ao seu material para a IA de sua preferência e salve a resposta como JSON UTF-8.</p>
        <button class="btn btn--gold" data-action="copy-prompt">Copiar prompt gerador</button>
      </section>
      <section class="panel">
        <p class="eyebrow">2. Valide e instale</p><h2>Importar pacote JSON</h2>
        <div class="dropzone"><input id="pack-file" type="file" accept="application/json,.json"><p class="muted" style="margin:.7rem 0 0">O arquivo permanece neste navegador.</p></div>
        ${renderImportReport()}
      </section>
    </div>
    <section class="panel" style="margin-top:1rem"><h2>Biblioteca local</h2><div class="package-list">${save.data.packages.length ? save.data.packages.map((pack) => `<div class="list-row"><div><strong>${html(pack.title)}</strong><small>${html(pack.package_id)} • ${pack.questions.length} questões • ${html(pack.language)}</small></div><button class="btn btn--danger btn--small" data-action="remove-package" data-package="${html(pack.package_id)}">Excluir</button></div>`).join("") : `<div class="empty"><h3>Nenhuma matéria importada</h3><p>Os modos de jogo serão liberados quando um pacote válido for instalado.</p></div>`}</div></section>
  `);
}

function renderImportReport() {
  if (!importReport) return "";
  return `<div class="report"><h3>${importReport.valid ? "Pacote pronto para instalar" : "O pacote precisa de correções"}</h3>
    ${importReport.summary ? `<div class="tags"><span class="tag">${importReport.summary.total} total</span><span class="tag">${importReport.summary.valid} válidas</span><span class="tag">${importReport.summary.invalid} inválidas</span></div>` : ""}
    ${importReport.errors.length ? `<h4 class="danger">Erros</h4><ul>${importReport.errors.slice(0, 12).map((error) => `<li>${html(error)}</li>`).join("")}</ul>` : ""}
    ${importReport.warnings.length ? `<h4 class="gold">Avisos</h4><ul>${importReport.warnings.slice(0, 12).map((warning) => `<li>${html(warning)}</li>`).join("")}</ul>` : ""}
    ${importReport.valid ? `<button class="btn btn--primary" data-action="install-package">Instalar pacote</button>` : ""}
  </div>`;
}

function weaknesses() {
  audio.play(MAIN_THEME);
  const entries = Object.entries(save.data.weaknesses).map(([id, data]) => ({ question: findQuestion(id), data })).filter((item) => item.question).sort((a, b) => b.data.priority - a.data.priority);
  setView(`
    ${viewHead("Baralho das Fraquezas", "Erros e dúvidas retornam aqui para se transformar em domínio.")}
    <section class="panel">
      ${entries.length ? `<div class="weakness-list">${entries.map(({ question, data }) => `<div class="list-row"><div><strong>${html(question.prompt)}</strong><small>${html(question.subject)} • ${html(question.topic)}</small></div><div class="tags"><span class="tag">prioridade ${data.priority}</span><span class="tag">${data.errors || 0} erros</span><span class="tag">${data.doubts || 0} dúvidas</span></div></div>`).join("")}</div><div class="button-row"><button class="btn btn--primary" data-action="start-review">Iniciar revisão</button></div>` : `<div class="empty"><h2>Nenhuma fraqueza registrada</h2><p>Questões erradas ou marcadas como dúvida aparecerão aqui.</p><button class="btn" data-action="quick">Fazer um duelo rápido</button></div>`}
    </section>
  `);
}

function stats() {
  audio.play(MAIN_THEME);
  const history = save.data.history;
  const correct = history.filter((item) => item.correct).length;
  const accuracy = history.length ? Math.round(correct / history.length * 100) : 0;
  const topics = new Map();
  for (const item of history) {
    const value = topics.get(item.topic) || { total: 0, correct: 0 };
    value.total += 1;
    value.correct += item.correct ? 1 : 0;
    topics.set(item.topic, value);
  }
  setView(`
    ${viewHead("Estatísticas e domínio", "Seu desempenho é calculado localmente e explicado com transparência.")}
    <section class="grid-3">${statCard(history.length, "Questões respondidas")}${statCard(correct, "Acertos")}${statCard(`${accuracy}%`, "Precisão geral")}${statCard(Object.keys(save.data.weaknesses).length, "Em revisão")}${statCard(Object.keys(save.data.campaign.completed).length, "Regiões vencidas")}${statCard(save.data.profile.level, "Nível de duelista")}</section>
    <section class="panel" style="margin-top:1rem"><h2>Domínio por assunto</h2>${topics.size ? [...topics.entries()].sort((a,b) => b[1].total-a[1].total).map(([topic, data]) => masteryRow(topic, data)).join("") : `<div class="empty">Responda algumas questões para calcular seu domínio.</div>`}</section>
  `);
}

function masteryRow(topic, data) {
  const accuracy = data.correct / data.total;
  const score = Math.round(accuracy * 70 + Math.min(1, data.total / 10) * 30);
  const level = score >= 90 && data.total >= 10 ? "Mestre" : score >= 75 && data.total >= 7 ? "Especialista" : score >= 55 && data.total >= 5 ? "Competente" : score >= 30 ? "Aprendiz" : "Iniciante";
  return `<div style="margin:1rem 0"><div style="display:flex;justify-content:space-between;gap:1rem"><strong>${html(topic)}</strong><span class="gold">${level} • ${score}%</span></div><div class="progress"><span style="width:${score}%"></span></div><small class="muted">${data.correct}/${data.total} acertos • volume, precisão e variedade ainda influenciam a evolução</small></div>`;
}

function collection() {
  audio.play(MAIN_THEME);
  setView(`
    ${viewHead("Coleção", "Recompensas cosméticas conquistadas na campanha.")}
    <section class="grid-3">${save.data.rewards.length ? save.data.rewards.map((reward, index) => `<article class="panel" style="text-align:center"><div class="rival-medallion" style="margin:0 auto 1rem">${["✦","◇","⚖","⚒","☾"][index] || "✧"}</div><h2>${html(reward)}</h2><p class="muted">Recompensa cosmética • não altera o dano nem revela respostas.</p></article>`).join("") : `<div class="panel empty" style="grid-column:1/-1"><h2>Sua coleção aguarda a primeira vitória</h2><button class="btn btn--primary" data-action="campaign">Abrir campanha</button></div>`}</section>
  `);
}

function settings() {
  audio.play(MAIN_THEME);
  const value = save.data.settings;
  setView(`
    ${viewHead("Configurações", "Ajuste o jogo ao seu ritmo e conforto.")}
    <section class="panel" style="max-width:850px">
      <div class="field"><label for="music-volume">Volume da música: ${Math.round(value.music * 100)}%</label><input id="music-volume" type="range" min="0" max="1" step="0.05" value="${value.music}" data-setting="music"></div>
      <div class="field" style="margin-top:1.2rem"><label for="effects-volume">Volume dos efeitos: ${Math.round(value.effects * 100)}%</label><input id="effects-volume" type="range" min="0" max="1" step="0.05" value="${value.effects}" data-setting="effects"></div>
      <div class="field" style="margin-top:1.2rem"><label for="text-scale">Tamanho do texto: ${Math.round(value.textScale * 100)}%</label><input id="text-scale" type="range" min="0.9" max="1.3" step="0.1" value="${value.textScale}" data-setting="textScale"></div>
      <label class="list-row" style="margin-top:1.2rem"><span><strong>Alto contraste</strong><small>Reforça contornos e contraste de texto.</small></span><input type="checkbox" data-setting="highContrast" ${value.highContrast ? "checked" : ""}></label>
      <label class="list-row" style="margin-top:.7rem"><span><strong>Reduzir movimento</strong><small>Remove transições e movimentos decorativos.</small></span><input type="checkbox" data-setting="reducedMotion" ${value.reducedMotion ? "checked" : ""}></label>
      <div class="button-row"><button class="btn btn--danger" data-action="reset-save">Apagar progresso local</button></div>
    </section>
  `);
}

function viewHead(title, subtitle) {
  return `<header class="view-head"><div><p class="eyebrow">Duelo do Saber</p><h1>${html(title)}</h1><p>${html(subtitle)}</p></div><div class="button-row"><button class="btn" data-action="menu">Menu principal</button></div></header>`;
}

function statCard(value, label) {
  return `<div class="stat"><strong>${value}</strong><small>${label}</small></div>`;
}

function difficultyOptions(selected) {
  return Object.entries(difficultyName).map(([value, label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label} — ${value === "easy" ? "1.000" : value === "medium" ? "2.000" : "4.000"} de dano por erro</option>`).join("");
}

async function importFile(file) {
  try {
    pendingPack = JSON.parse(await file.text());
    importReport = validateQuestionPack(pendingPack);
  } catch (error) {
    pendingPack = null;
    importReport = { valid: false, errors: [`JSON inválido: ${error.message}`], warnings: [] };
  }
  forge();
}

async function copyPrompt() {
  try {
    const prompt = await fetch("docs/PROMPT_GERADOR.md").then((response) => response.text());
    await navigator.clipboard.writeText(prompt);
    showToast("Prompt oficial copiado.");
  } catch {
    showToast("Não foi possível copiar automaticamente; abra docs/PROMPT_GERADOR.md.");
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (["menu", "campaign", "quick", "forge", "weaknesses", "stats", "collection", "settings"].includes(action)) return ({ menu, campaign, quick, forge, weaknesses, stats, collection, settings })[action]();
  if (action === "toggle-audio") {
    const enabled = audio.toggle();
    button.textContent = enabled ? "♪" : "×";
    showToast(enabled ? "Música ativada." : "Música pausada.");
  }
  if (action === "rival-info") rivalInfo(button.dataset.region);
  if (action === "start-campaign") startDuel(getRegion(button.dataset.region), "campaign", selectedPackage(), save.data.campaign.difficulty);
  if (action === "start-quick") {
    const region = getRegion(document.querySelector("#quick-region").value);
    const pack = save.data.packages.find((item) => item.package_id === document.querySelector("#quick-pack").value);
    startDuel(region, "quick", pack, document.querySelector("#quick-difficulty").value);
  }
  if (action === "select-answer" && battle && !battle.lastResult) {
    battle.selected = button.dataset.answer;
    renderBattle();
  }
  if (action === "confirm-answer") resolveAnswer();
  if (action === "continue-battle") nextQuestion();
  if (action === "ability") useAbility(button.dataset.ability);
  if (action === "flag-question") {
    save.flagQuestion(button.dataset.question);
    showToast("Questão marcada para revisão.");
    button.disabled = true;
  }
  if (action === "pause" && confirm("Sair deste duelo? As respostas já avaliadas continuarão salvas.")) menu();
  if (action === "copy-prompt") copyPrompt();
  if (action === "install-package" && pendingPack) {
    if (!isPlayableUserPack(pendingPack)) {
      pendingPack = null;
      importReport = { valid: false, errors: ["Este identificador é reservado ao pacote interno de testes. Use outro package_id."], warnings: [] };
      forge();
      return;
    }
    save.installPackage(pendingPack);
    save.data.campaign.packageId = pendingPack.package_id;
    save.persist();
    importReport = null;
    pendingPack = null;
    forge();
    showToast("Pacote instalado e selecionado para a campanha.");
  }
  if (action === "remove-package") {
    const pack = save.data.packages.find((item) => item.package_id === button.dataset.package);
    if (pack && confirm(`Excluir o pacote “${pack.title}” deste navegador?`)) {
      save.data.packages = save.data.packages.filter((item) => item.package_id !== pack.package_id);
      if (save.data.campaign.packageId === pack.package_id) save.data.campaign.packageId = save.data.packages[0]?.package_id || null;
      save.persist();
      forge();
    }
  }
  if (action === "start-review") {
    const questions = Object.keys(save.data.weaknesses).map(findQuestion).filter(Boolean);
    startDuel(REGIONS[0], "review", { title: "Baralho das Fraquezas", questions }, "medium", questions);
  }
  if (action === "reset-save" && confirm("Apagar todo o progresso, pacotes importados e configurações locais?")) {
    save.reset();
    applySettings();
    menu();
    showToast("Progresso local reiniciado.");
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "pack-file" && event.target.files[0]) importFile(event.target.files[0]);
  if (event.target.dataset.setting === "campaign-package") {
    save.data.campaign.packageId = event.target.value;
    save.persist();
    campaign();
  }
  if (event.target.dataset.setting === "campaign-difficulty") {
    save.data.campaign.difficulty = event.target.value;
    save.persist();
  }
  if (["highContrast", "reducedMotion"].includes(event.target.dataset.setting)) {
    save.data.settings[event.target.dataset.setting] = event.target.checked;
    save.persist();
    applySettings();
  }
});

document.addEventListener("input", (event) => {
  const setting = event.target.dataset.setting;
  if (!["music", "effects", "textScale"].includes(setting)) return;
  save.data.settings[setting] = Number(event.target.value);
  save.persist();
  applySettings();
  const label = event.target.previousElementSibling;
  if (label) label.textContent = `${setting === "music" ? "Volume da música" : setting === "effects" ? "Volume dos efeitos" : "Tamanho do texto"}: ${Math.round(event.target.value * 100)}%`;
});

document.addEventListener("keydown", (event) => {
  if (!battle || battle.lastResult || event.target.matches("input, select, textarea")) return;
  const number = Number(event.key);
  if (number >= 1 && number <= 5) {
    const alternative = battle.question.alternatives[number - 1];
    if (!battle.eliminated.has(alternative.id)) {
      battle.selected = alternative.id;
      renderBattle();
    }
  }
  if (event.key === "Enter" && battle.selected) resolveAnswer();
});

applySettings();
menu();

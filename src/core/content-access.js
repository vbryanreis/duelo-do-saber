const INTERNAL_PACK_IDS = new Set(["gdd-duelo-do-saber-demo"]);

export function isPlayableUserPack(pack) {
  return Boolean(
    pack &&
    typeof pack.package_id === "string" &&
    !INTERNAL_PACK_IDS.has(pack.package_id) &&
    Array.isArray(pack.questions) &&
    pack.questions.length > 0
  );
}

export function canStartWithPackages(packages) {
  return Array.isArray(packages) && packages.some(isPlayableUserPack);
}

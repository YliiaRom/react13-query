function readColl(keyLS) {
  return JSON.parse(localStorage.getItem(keyLS)) || [];
}

function writeColl(keyLS, list) {
  localStorage.setItem(keyLS, JSON.stringify(list));
}

export const addItemActionToLS = (itemObj, keyLS = "history") => {
  const list = readColl(keyLS);
  list.push(itemObj);
  writeColl(keyLS, list);
};

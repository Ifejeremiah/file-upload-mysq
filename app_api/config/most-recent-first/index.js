module.exports = (lists) => {

  const compare = (a, b) => {
    const createdOnA = a.date_created;
    const createdOnB = b.date_created;

    let comparison = 1;
    if (createdOnA > createdOnB) {
      comparison = -1;
    }
    return comparison;
  }

  if (lists && lists.length > 0) {
    return lists.sort(compare);
  } else {
    return null;
  }
}
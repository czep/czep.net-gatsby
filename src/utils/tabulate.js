

const tabulate = function (x) {
  let tab = new Map();
  x.forEach(item => {
    if (tab.get(item)) {
      tab.set(item, 1 + tab.get(item));
    } else {
      tab.set(item, 1);
    }
  });
  return tab;
};

module.exports.tabulate = tabulate;


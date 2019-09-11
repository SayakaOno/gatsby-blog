const categoriesEn = {
  personal: 'プライベート',
  canada: 'カナダ',
  vancouver: 'バンクーバー',
  react: 'react',
  'about me': 'about me',
  'job search abroad': '海外就活',
  'working abroad': '海外就労'
};

const categoriesJa = {};
for (let key in categoriesEn) {
  categoriesJa[categoriesEn[key]] = key;
}

const tagsEn = {
  web: 'web',
  life: '生活',
  cafe: 'カフェ',
  english: '英語',
  dessert: 'スイーツ',
  restaurant: 'レストラン',
  jobsearch: '就活',
  introduction: '自己紹介'
};

const tagsJa = {};
for (let key in tagsEn) {
  tagsJa[tagsEn[key].toString()] = key;
}

const getSplitPath = currentPath => {
  // [category or tag, name, language]
  let path = currentPath.substring(1, currentPath.length).split('/');
  path[1] = decodeURIComponent(path[1]);
  return path;
};

const getCorrespondingPath = currentPath => {
  let path = getSplitPath(currentPath);
  if (path[0] === 'category') {
    if (path[2] === 'ja') {
      return `/category/${categoriesJa[path[1]]}`;
    } else {
      return `/category/${categoriesEn[path[1]]}/ja`;
    }
  }

  // Tag
  if (path[2] === 'ja') {
    return `/tag/${tagsJa[path[1]]}`;
  } else {
    return `/tag/${tagsEn[path[1]]}/ja`;
  }
};

const pageExist = (path, pathList) => {
  path = getCorrespondingPath('/' + getSplitPath(path).join('/'));
  for (let node of pathList) {
    if (path === node.path) {
      return true;
    }
  }
  return false;
};

export { getCorrespondingPath, pageExist };

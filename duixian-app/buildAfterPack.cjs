const fs = require('fs');

exports.default = async (context) => {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }
  const {
    productFilename,
    info: {
      _metadata: { electronLanguagesInfoPlistStrings },
    },
  } = context.packager.appInfo;

  const resPath = `${appOutDir}/${productFilename}.app/Contents/Resources/`;
  console.log(
    '\n> 基于 package.json 配置项 “electronLanguagesInfoPlistStrings” 创建语言包 Sta \n',
    '\n>  electronLanguagesInfoPlistStrings:\n',
    electronLanguagesInfoPlistStrings,
    '\n\n',
    '>  ResourcesPath:',
    resPath
  );

  // 创建APP语言包文件
  return await Promise.all(
    Object.keys(electronLanguagesInfoPlistStrings).map((langKey) => {
      const infoPlistStrPath = `${langKey}.lproj/InfoPlist.strings`;
      let infos = '';
      const langItem = electronLanguagesInfoPlistStrings[langKey];
      Object.keys(langItem).forEach((infoKey) => {
        infos += `"${infoKey}" = "${langItem[infoKey]}";\n`;
      });
      return new Promise((resolve) => {
        fs.writeFile(`${resPath}${infoPlistStrPath}`, infos, (err) => {
          resolve();
          if (err) throw err;
          console.log(`>  “{ResourcesPath}/${infoPlistStrPath}” 创建完毕。`);
        });
      });
    })
  );
};
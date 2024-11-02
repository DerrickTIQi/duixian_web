const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

module.exports = async (context) => {

    // 复制文件到指定目录
    const currentDir = __dirname;
    const sourceDir = path.join(currentDir, '..', 'duixian-admin', 'dist'); // 源文件目录
    const destinationDir = path.join(currentDir, 'public','web'); // 目标文件目录

    try {
        await fsExtra.copy(sourceDir, destinationDir);
        console.log(`> 文件从 "${sourceDir}" 复制到 "${destinationDir}" 完成。`);
    } catch (err) {
        console.error('复制文件时出错:', err);
        throw new Error(`打包过程因以下错误而停止: ${err}`);
    }
};

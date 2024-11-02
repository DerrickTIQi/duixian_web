import config from '@/config'
export async function getVersion() {
    try {
        if (!config.isWeb) {
            const version = await window.electron.getVersion();
            return version;
        } else {
            return 'unknown_version'; // 默认版本号
        }

    } catch (error) {
        console.error('Error fetching version:', error);
        return 'unknown_version'; // 默认版本号
    }
}
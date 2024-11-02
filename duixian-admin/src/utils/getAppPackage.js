import config from '@/config'
export async function getAppPackage() {
    try {
        if (!config.isWeb) {
            const packageJs = await window.electron.getPackage();
            
            return packageJs;
        } else {
            return '';
        }
    } catch (error) {
        return '';
    }
}
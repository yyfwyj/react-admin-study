// 数据加密
import CryptoJS from "crypto-js";

const SECRET_KEY = "6a2d4f8e-b2c1-407d-a8b0-f4c2e0f1d2c3";

// 加密函数
export const encryptData = (data: any): string => {
    try {
        const jsonString = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
        return encrypted;
    } catch (error) {
        console.error("加密失败:", error);
        throw new Error("加密失败");
    }
}

// 解密函数
export const decryptData = (encrypted: string): any => {
    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
        let decrypted = bytes.toString(CryptoJS.enc.Utf8);

        // 去除多余的转义字符
        decrypted = decrypted.replace(/\\+/g, '\\'); // 替换多个反斜杠为一个
        decrypted = decrypted.replace(/^"|"$/g, ''); // 去除开头和结尾的引号
        decrypted = decrypted.replace(/\\"/g, '"'); // 恢复双引号
        decrypted = decrypted.replace(/\\\\/g, '\\'); // 恢复单个反斜杠

        return JSON.parse(decrypted);
    } catch (error) {
        console.error("解密失败:", error);
        return {}; // 返回空对象以防止应用崩溃
    }
}
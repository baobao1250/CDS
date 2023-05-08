import { TinhTrangEnum } from "models/tinhTrangEnum";

export default class EnumUtils{
    static getEnumKeyByEnumValue  <T extends {[index:string]:string}>(myEnum:T, enumValue:string):keyof T|null {
        let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
        return keys.length > 0 ? keys[0] : null;
    }

    static getEnumTypeByEnumValue(enumValue:string){
        switch(enumValue){
            case "DANG_SOAN": return TinhTrangEnum.DANG_SOAN; 
            case "DA_PHAN_HOI": return TinhTrangEnum.DA_PHAN_HOI; 
            case "HUY_YEU_CAU": return TinhTrangEnum.HUY_YEU_CAU; 
            case "CHUA_PHAN_HOI": return TinhTrangEnum.CHUA_PHAN_HOI;
            default: return TinhTrangEnum.CHUA_PHAN_HOI;
        }
    }
}


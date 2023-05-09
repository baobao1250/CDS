export interface DanhSachCaNhanDTO {
    id: number;
    code: string
    name: string;
    sdt: string;
    gmail: string;
    sotien:string;
    ngaynop: string;
    noidung: string
    active:boolean;

}
export const dataDSCN: DanhSachCaNhanDTO[] = [
    { id: 1, code: 'Q1', name: 'Quỷ chữ thập đỏ', sdt: 'Mô tả quỹ 1',gmail:'1@getMaxListeners.com',sotien:'200', ngaynop: '2023-05-01',noidung:'ABC', active: true },
    { id: 2, code: 'Q2', name: 'Qủy ủng hộ thiên tai', sdt: 'Mô tả quỹ 2',gmail:'1@getMaxListeners.com',sotien:'200',ngaynop: '2023-05-02',noidung:'ABC', active: false },
    { id: 3, code: 'Q3', name: 'Qủy khuyến học', sdt: 'Mô tả quỹ 3',gmail:'1@getMaxListeners.com',sotien:'200', ngaynop: '2023-05-03',noidung:'ABC', active: true },
   
  ];
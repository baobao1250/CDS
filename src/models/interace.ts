export interface DanhMucQuyDTO {
    id: number;
    code: string
    name: string;
    ngaytao: string;
    mota: string;
    active:boolean;

}
export const dataDMQuy: DanhMucQuyDTO[] = [
    { id: 1, code: 'Q1', name: 'Quỹ 1', mota: 'Mô tả quỹ 1', ngaytao: '2023-05-01', active: true },
    { id: 2, code: 'Q2', name: 'Quỹ 2', mota: 'Mô tả quỹ 2', ngaytao: '2023-05-02', active: false },
    { id: 3, code: 'Q3', name: 'Quỹ 3', mota: 'Mô tả quỹ 3', ngaytao: '2023-05-03', active: true },
    { id: 4, code: 'Q1', name: 'Quỹ 1', mota: 'Mô tả quỹ 1', ngaytao: '2023-05-01', active: true },
    { id: 5, code: 'Q2', name: 'Quỹ 2', mota: 'Mô tả quỹ 2', ngaytao: '2023-05-02', active: false },
    { id: 6, code: 'Q3', name: 'Quỹ 3', mota: 'Mô tả quỹ 3', ngaytao: '2023-05-03', active: true },
  ];
export interface DanhSachCongDanDTO {
    id: number;
    code: string
    name: string;
    sdt: string;
    cccd: string;
    gmail: string;
    diachi: string;
    quy?: string;
    ngaytao?: string;
    active:boolean;

}
export const dataDSCD: DanhSachCongDanDTO[] = [
  { id: 1, code: 'Q1', name: 'Nguyễn Văn A', sdt: 'Mô tả quỷ 1',gmail:'1@getMaxListeners.com',cccd:'200', active: true,diachi:'An phúc - Đông Hải -Bạc Liêu',quy: 'Quỷ chữ thập đỏ',ngaytao:'20-2-2023' },
  { id: 2, code: 'Q2', name: 'Nguyễn Văn B', sdt: 'Mô tả quỷ 2',gmail:'1@getMaxListeners.com',cccd:'300', active: false,diachi:'An phúc - Đông Hải -Bạc Liêu',quy: 'Quỷ ủng hộ thiên tai',ngaytao:'20-2-2023' },
  { id: 3, code: 'Q3', name: 'Nguyễn Văn C', sdt: 'Mô tả quỷ 3',gmail:'1@getMaxListeners.com',cccd:'400', active: true,diachi:'An phúc - Đông Hải -Bạc Liêu',quy: 'Quỷ khuyến học',ngaytao:'20-2-2023' },
 
  ];
  
  
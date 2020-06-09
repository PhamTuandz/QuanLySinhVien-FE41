//Tạo object chứa thông tin request về api từ BE
//Lưu ý: các thông tin phải chính xác với BE cung cấp
var objectAjax = {
    url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
    method: 'GET',
    responseType:'json'
}

//Dùng thư viện axios gửi thông tin yêu cầu BE trả về dữ liệu
var renderTable = function (res){
    var noiDungTable = '';

    for(var i = 0; i < res.data.length; i++){
        var sinhVien = res.data[i];
        noiDungTable += `
            <tr>
                <td>${sinhVien.MaSV}</td>
                <td>${sinhVien.HoTen}</td>
                <td>${sinhVien.Email}</td>
                <td>${sinhVien.SoDT}</td>
                <td>${sinhVien.DiemToan}</td>
                <td>${sinhVien.DiemLy}</td>
                <td>${sinhVien.DiemHoa}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.MaSV}')">Xóa</button>
                    <button class="btn btn-warning" onclick="chinhSua('${sinhVien.MaSV}')">Sua</button>
                </td>
            </tr>
        `
    }
    document.getElementById('tblSinhVien').innerHTML = noiDungTable;
}
var loadDanhSachSinhVien  = function (){
    var promise = axios(objectAjax);
    promise.then(renderTable).catch(function(error){
    console.log(error);
    });
}
//Gọi hàm load
loadDanhSachSinhVien();
//***********Chức năng thêm Sinh viên*************
document.getElementById('btnThemSinhVien').onclick = function (){
    var sinhVien = new SinhVien();

    sinhVien.MaSV = document.getElementById('maSV').value;
    sinhVien.HoTen = document.getElementById('hoTen').value;
    sinhVien.Email = document.getElementById('email').value;
    sinhVien.SoDT = document.getElementById('soDT').value;
    sinhVien.DiemToan = document.getElementById('diemToan').value;
    sinhVien.DiemLy = document.getElementById('diemLy').value;
    sinhVien.DiemHoa = document.getElementById('diemHoa').value;
    
    //Dùng object đưa dữ liệu vê BE
    var objAxios = {
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: sinhVien
        
    }

    //Dùng axios đưa dữ liệu về BE
    axios(objAxios).then(function(res){
        console.log(res);
        loadDanhSachSinhVien();
    }).catch(function(err){
        console.log(err.response.data);
        loadDanhSachSinhVien();
    });

}

var xoaSinhVien = function(maSV){
    var objAjaxXoaSinhVien = {
        url:`http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${maSV}`,
        method: 'DELETE'
    }

    axios(objAjaxXoaSinhVien).then(function(res){
        console.log(res);
        loadDanhSachSinhVien();
    }).catch(function(err){
        console.log(err);
        loadDanhSachSinhVien()    
    });
}

var chinhSua = function(maSV){
    
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${maSV}`,
        method: 'GET'
    }).then(function(res){
        console.log(res.data);
        //Dom đến input set giá trị valua đúng thuộc tính
        var sinhVien = res.data;
        document.getElementById('maSV').value = sinhVien.MaSV;
        document.getElementById('hoTen').value = sinhVien.HoTen;
        document.getElementById('email').value = sinhVien.Email;
        document.getElementById('soDT').value = sinhVien.SoDT;
        document.getElementById('diemToan').value = sinhVien.DiemToan;
        document.getElementById('diemLy').value  = sinhVien.DiemLy;
        document.getElementById('diemHoa').value = sinhVien.DiemHoa;
    
    }).catch(function(err){
        console.log(err.response.data);
    })
}

document.getElementById('btnCapNhapSinhVien').onclick = function(){
    var sinhVien = new SinhVien();

    sinhVien.MaSV = document.getElementById('maSV').value;
    sinhVien.HoTen = document.getElementById('hoTen').value;
    sinhVien.Email = document.getElementById('email').value;
    sinhVien.SoDT = document.getElementById('soDT').value;
    sinhVien.DiemToan = document.getElementById('diemToan').value;
    sinhVien.DiemLy = document.getElementById('diemLy').value;
    sinhVien.DiemHoa = document.getElementById('diemHoa').value;
    console.log(sinhVien);
    axios({
        url:'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
        method:'PUT',
        data:sinhVien
    }).then(function(res){
        console.log(res.data);
        loadDanhSachSinhVien()
    }).catch(function(err){
        console.log(err.response.data);
    })
}
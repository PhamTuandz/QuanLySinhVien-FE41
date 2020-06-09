var objectAjax = {
    url: '../data/DanhSachNguoiDung.json', // Đường dẫn đến file chứa dữ liệu or api backend
    method:'GET', //Giao thức backend cung cấp ứng với url
    responseType:'json'
}
var renderTable = function(res){
    var noidungTable = '';
    for(var i = 0; i < res.data.length; i++){
        //Từ đối tượng người dùng mình sẽ tạo ra thẻ tương ứng
        var nguoiDung = res.data[i];
        noidungTable += `
           <tr>
                <td>${nguoiDung.TaiKhoan}</td>
                <td>${nguoiDung.MatKhau}</td>
                <td>${nguoiDung.HoTen}</td>
                <td>${nguoiDung.Email}</td>
                <td>${nguoiDung.SoDienThoai}</td>
           </tr>
        `
    }
    //Dom đến table tbody chèn các tr vừa tạo vào
    document.getElementById('tblNguoiDung').innerHTML = noidungTable;
}

// var renderCard = function(res){
//     var noidungTable = '';
//     for(var i = 0; i < res.data.length; i++){
//         //Từ đối tượng người dùng mình sẽ tạo ra thẻ tương ứng
//         var nguoiDung = res.data[i];
//         noidungTable += `
//            <tr>
//                 <td>${nguoiDung.TaiKhoan}</td>
//                 <td>${nguoiDung.MatKhau}</td>
//                 <td>${nguoiDung.HoTen}</td>
//                 <td>${nguoiDung.Email}</td>
//                 <td>${nguoiDung.SoDienThoai}</td>
//            </tr>
//         `
//     }
//     //Dom đến table tbody chèn các tr vừa tạo vào
//     document.getElementById('tblNguoiDung').innerHTML = noidungTable;
// }

//;nd
var promise = axios(objectAjax);
promise.then(renderTable).catch(function(error){
    //Hàm xử lý khi request thất bại
    console.logO(error)
});
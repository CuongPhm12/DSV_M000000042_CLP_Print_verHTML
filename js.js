$("#no_show").hide();

function getData() {
  let masterNo = $("#master_no").text().trim();
  console.log(masterNo);
  const data_Send = {};
  data_Send.menucode = "M000000042";
  data_Send.type = "get_data";
  data_Send.header = JSON.stringify({ masterNo: masterNo });
  $.ajax({
    type: "post",
    url: "/ajax.do",
    data: data_Send,
    async: false,
    success: function (response, status, request) {
      const { res_master, res_detail, sql1, sql } = JSON.parse(response.trim());
      // console.log({ res_master,res_detail,sql1,sql });

      let m_createdate = res_master[0].master_createdate || "";
      let mawb = res_master[0].master_no || "";
      let m_dest = res_master[0].master_destination || "";
      let flt_no = res_master[0].flight_no || "";
      let etd = res_master[0].etd || "";
      let etd_status = res_master[0].etd_status || "";
      let rate = res_master[0].rate || "";
      let remark = res_master[0].remark || "";
      let m_remark = "M Remark: " + res_master[0].master_remark || "";

      let release_request = res_master[0].release_request || "";
      let print_yn = res_master[0].print_yn || "";
      // console.log({ print_yn });
      release_request === "출고요청"
        ? $("#CLP_id").text("O")
        : $("#CLP_id").text("");
      print_yn === "Y"
        ? $("#print_yn_id").text("O")
        : $("#print_yn_id").text("");
    },
    error: function (xmlHttpRequest, txtStatus, errorThrown) {
      console.log("erorr");
    },
  });
}
getData();

//Declare variable
let elements_1 = $(".sum-1");
let elements_2 = $(".sum-2");
let elements_3 = $(".sum-3");
let elements_4 = $(".sum-4");
let sum1 = 0;
let sum2 = 0;
let sum3 = 0;
let sum4 = 0;

//get total by id
for (let i = 0; i < elements_1.length; i++) {
  let a = elements_1[i].innerText;
  a = parseFloat(a);

  if (isNaN(a)) {
    a = 0;
  }
  sum1 += a;
}

//get total by id
for (let i = 0; i < elements_2.length; i++) {
  let a = elements_2[i].innerText;
  a = parseFloat(a.replace(",", ""));

  if (isNaN(a)) {
    a = 0;
  }
  sum2 += a;
}

//get total by id
for (let i = 0; i < elements_3.length; i++) {
  let a = elements_3[i].innerText;
  a = parseFloat(a.replace(",", ""));

  if (isNaN(a)) {
    a = 0;
  }
  sum3 += a;
}

//get total by id
for (let i = 0; i < elements_4.length; i++) {
  let a = elements_4[i].innerText;
  a = parseFloat(a.replace(",", ""));

  if (isNaN(a)) {
    a = 0;
  }
  sum4 += a;
}

$("#sum-1")[0].innerText = formatNumber(getNum(sum1));
$("#sum-2")[0].innerText = formatNumber(getNum(sum2));
$("#sum-3")[0].innerText = formatNumber(getNum(sum3));
$("#sum-4")[0].innerText = formatNumber(getNum(sum4));
$("#sum-1").css("font-weight", "bold");
$("#sum-2").css("font-weight", "bold");
$("#sum-3").css("font-weight", "bold");
$("#sum-4").css("font-weight", "bold");

//format number
function formatNumber(number) {
  // Chuyển số thành chuỗi
  let numStr = number.toString();

  // Tìm vị trí của dấu thập phân
  let decimalIndex = numStr.indexOf(".");

  // Nếu không có dấu thập phân, gán vị trí cuối cùng của chuỗi
  if (decimalIndex === -1) {
    decimalIndex = numStr.length;
  }

  // Duyệt qua chuỗi từ cuối về đầu và chèn dấu ',' sau mỗi ba chữ số
  for (let i = decimalIndex - 3; i > 0; i -= 3) {
    numStr = numStr.slice(0, i) + "," + numStr.slice(i);
  }

  // Trả về chuỗi đã định dạng
  return numStr;
}

//prevent NaN val
function getNum(val) {
  if (isNaN(val)) {
    return 0;
  }
  return val;
}

// Function to add numbering to the 순번 column
function addSequenceNumbers() {
  // Get the tbody element
  var tbody = document
    .getElementById("data_table")
    .getElementsByTagName("tbody")[0];

  // Get all rows in the tbody
  var rows = tbody.getElementsByTagName("tr");

  // Iterate through the rows and add sequence number to the first cell
  for (var i = 2; i < rows.length - 2; i++) {
    var sequenceCell = rows[i + 1].getElementsByTagName("td")[0];
    sequenceCell.textContent = i - 1;
  }
}

// Combined function to run both functions on window.onload
function onWindowLoad() {
  addSequenceNumbers();
}

// Call the combined function to add sequence numbers when the page loads
window.onload = onWindowLoad;

import Swal from 'sweetalert2'


export async function AlertConfirm(title = 'ยืนยันการทำรายการ', text = 'คุณต้องการทำรายการหรือไม่ ?') {
    let confirm = false;
    await Swal.fire({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',

    }).then((result) => {
        if (result.value) {
            confirm = true;
        }

    })

    return confirm;

}
export async function AlertSuccess(title = 'Success', timer = 1500, position = 'center', buttonConfirm = false) {
    let res = false;
    await Swal.fire({
        position: position, // top-end
        type: 'success',
        title: title,
        showConfirmButton: buttonConfirm,
        timer: timer
    }).then(() => {
        res = true;
    });
    return res;
}
export async function AlertError({ title = 'เกิดข้อผิดพลาด', text = 'ไม่สามารถทำรายการได้' }) {
    let res = false;
    await Swal.fire({
        type: 'error',
        title: title,
        text: text,
    }).then(() => {
        res = true;
    });
    return res;
}

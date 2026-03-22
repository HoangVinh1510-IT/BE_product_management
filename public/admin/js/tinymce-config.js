tinymce.init({
  selector: ".textarea-mce",
  license_key: "gpl",  // ✅ thêm dòng này để tắt cảnh báo
  plugins: "lists link image",
  toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist"

});
export const readFileFromInputElement = (input, onLoadFile) => {
    let files = Array.from(input.files);
    if (files && files.length > 0) {
        files.forEach((file) => {
            let reader = new FileReader();
            reader.onload = () => {
                onLoadFile(file);
            }
            reader.readAsDataURL(file, input.files);
        });
    }
}
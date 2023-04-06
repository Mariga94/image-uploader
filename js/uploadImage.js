const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "nq1q33zh");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dfsgz2gnb/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data
  } catch (err) {
    console.log(err);
  }
};

export default uploadFile;

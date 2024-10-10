const ImageUpload = ({ 
  setSelectedImage1, 
  setSelectedImage2, 
  setSelectedImageDetail, 
  handleImageUpload, 
  selectedImage1, 
  selectedImage2, 
  selectedImageDetail 
}) => (
  <div>
    <h2>Subir Imágenes</h2>
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedImage1(e.target.files[0])}
      />
      {selectedImage1 && <p>Imagen 1 seleccionada: {selectedImage1.name}</p>}
    </div>
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedImage2(e.target.files[0])}
      />
      {selectedImage2 && <p>Imagen 2 seleccionada: {selectedImage2.name}</p>}
    </div>
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedImageDetail(e.target.files[0])}
      />
      {selectedImageDetail && <p>Imagen Detallada seleccionada: {selectedImageDetail.name}</p>}
    </div>
    <button
      onClick={handleImageUpload}
      disabled={!selectedImage1 || !selectedImage2 || !selectedImageDetail}
    >
      Subir Imágenes
    </button>
  </div>
);

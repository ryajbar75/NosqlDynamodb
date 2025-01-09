import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import './AddEmployee.css';  // Assurez-vous que le fichier CSS est bien importé

const AddEmployeeWithCapture = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [image, setImage] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const webcamRef = useRef(null);

  // Récupérer la liste des départements depuis l'API
  useEffect(() => {
    fetch("http://localhost:8083/departments")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des départements.");
        setLoading(false);
      });
  }, []);

  // Capture l'image depuis la caméra
  const captureImage = () => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImage(capturedImage); // L'image capturée est en base64
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Veuillez capturer une image !");
      return;
    }

    // Convertir l'image base64 en fichier Blob
    const blob = await fetch(image).then((res) => res.blob());
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("departmentId", departmentId); // Utiliser le département sélectionné
    formData.append("birthDate", birthDate);
    formData.append("file", blob, "captured_image.jpg");

    try {
      const response = await fetch("http://localhost:8083/api/employees/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Employé ajouté avec succès !");
        // Réinitialiser les champs du formulaire
        setFirstName("");
        setLastName("");
        setEmail("");
        setDepartmentId("");
        setBirthDate("");
        setImage(null);
      } else {
        const errorText = await response.text();
        alert(`Erreur lors de l'ajout de l'employé : ${errorText}`);
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de l'ajout de l'employé");
    }
  };

  if (loading) {
    return <div>Chargement des départements...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Ajouter un employé avec capture d'image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Liste déroulante pour sélectionner le département */}
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
        >
          <option value="">Sélectionner un département</option>
          {departments.map((department) => (
            <option key={department.departmentId} value={department.departmentId}>
              {department.departmentName}
            </option>
          ))}
        </select>

        <input
          type="date"
          placeholder="Date de naissance"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />

        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: "100%", height: "auto" }}
          />
          <button type="button" onClick={captureImage}>
            Capturer l'image
          </button>
        </div>

        {image && (
          <div>
            <h3>Image Capturée :</h3>
            <img src={image} alt="Captured" style={{ width: "200px" }} />
          </div>
        )}

        <button type="submit">Ajouter l'employé</button>
      </form>

      <h3>Liste des départements</h3>
      <ul>
        {departments.map((department) => (
          <li key={department.departmentId}>{department.departmentName}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddEmployeeWithCapture;

import {useState} from 'react';

function Upload(){
   const [selectedFile, setSelectedFile] = useState();
   const [isFilePicked, setIsFilePicked] = useState(false);

   const changeHandler = (event) => {
     setSelectedFile(event.target.files[0]);
     console.log(event.target.files[0]);
     setIsFilePicked(true);
   };

   const handleSubmission = () => {
   const formData = new FormData();
   console.log(formData);
   formData.append('profile_pic', selectedFile);
   console.log(formData);

   fetch(
     'http://localhost:8080/api-movie/upload/upload-profile-pic',
     {
       method: 'POST',
       body: formData,
     }
   )
   .then((response) => console.log('222222222222', response))
   .then((result) => {
     console.log('Success:', result);
   })
   .catch((error) => {
     console.error('Error:', error);
   });
  };


   return(
     <div>
       <input type="file" name="profile_pic" onChange={changeHandler} />
       {isFilePicked ? (
         <div>
           <p>Filename: {selectedFile.name}</p>
           <p>Filetype: {selectedFile.type}</p>
           <p>Size in bytes: {selectedFile.size}</p>
           <p>Last modified date: {(new Date(selectedFile.lastModified*1000)).getMonth()}</p>
           <p>Last modified date: {(new Date(selectedFile.lastModified*1000)).getDate()}</p>
           <p>Last modified date: {(new Date(selectedFile.lastModified*1000)).getFullYear()}</p>
         </div>
       ) : (
         <p>Select a file to show details</p>
       )}
       <div>
         <button onClick={handleSubmission}>Submit</button>
       </div>
     </div>
  )
}

export default Upload;

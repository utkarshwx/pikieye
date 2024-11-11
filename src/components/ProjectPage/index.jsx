import React, { useEffect, useState } from 'react'
import Header from '../../layouts/Header/Header';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../style/Button';
import { getbyProjectId } from '../../helpers/getbyProjectId';
import axios from 'axios';
import './ProjectPage.css';
import Modal from '../Modal/Modal';
import { baseURL } from '../../helpers/baseUrl';


const ProjectPage = () => {

    const [inputs, setInputs] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalSearch, setShowModalSearch] = useState(false);
    const [foundFaces, setFoundFaces] = useState([]);
    const [newComponent, setNewComponent] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [found, setFound] = useState(false);
    const [photosLength, setPhotosLength] = useState(0);

    const { id } = useParams();

    const [project, setProject] = useState({});


    useEffect(() => {
        // getbyProjectId(id).then(projectInfo => {
        //     setProject(projectInfo);
        // });

        // if(!id) return;

        const getProjectInfo = async () => {
            const projectInfo = await getbyProjectId(id);
            setProject(projectInfo);
        }

        const projectInfo = getProjectInfo();
        setProject(projectInfo);

    }, []);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const imageFiles = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setInputs(imageFiles);
    };

    const handleUpload = async () => {

        const formData = new FormData();

        inputs.forEach((image) => {
            formData.append('images', image.file);
        })

        axios.post(`/facefeature/imagesupload/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                console.log(response);
                handleRefresh();
            })
            .catch(error => {
                console.log(error);
            })

        setShowModal(false);
    }

    const handleFindFace = async () => {
        const formData = new FormData();

        inputs.forEach((image) => {
            formData.append('image', image.file);
        })

        axios.post(`/facefeature/find_faces/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                console.log(response);
                setFoundFaces(response.data.matching_images);
                setNewComponent(true);
                setShowModalSearch(false);

            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get(`/project/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data.grdifs_ids);
                setPhotos(response.data.grdifs_ids);
                setPhotosLength(response.data.grdifs_ids.length);
                console.log(photosLength);
            })
            .catch(error => {
                console.log(error);
                console.log(error.response.status);
                if (error.response.status === 404) {
                    setFound(true);
                }
            })


    }, [id, refresh]);


    return (
        <div>
            <Header />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className='flex items-center justify-center'>
                    <div className='container space-y-5 rounded-lg px-3 md:px-10 py-3 md:py-5 z-20'>
                        <h1 className='text-2xl'>Upload Images in Project</h1>
                        <input className='' type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={handleImageChange} multiple />
                        <Button title="Upload" type="primary" onClick={handleUpload} />
                    </div>

                </div>
            </Modal>
            <Modal show={showModalSearch} onClose={() => setShowModalSearch(false)}>
                <div className='flex items-center justify-center'>
                    <div className='container space-y-5 rounded-lg px-3 md:px-10 py-3 md:py-5 z-20'>
                        <h1 className='text-2xl'>Upload Images for Search</h1>
                        <input className='border-blue-600 border-2 p-2' type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={handleImageChange} multiple />
                        <Button title="Add" type="primary" onClick={handleFindFace} />
                    </div>
                </div>
            </Modal>
            <div className='bg-blue-100/50 p-10 backdrop-blur-lg shadow-xl rounded-xl grid items-start m-5'>

                <div >
                    <div className='flex items-center gap-5'>
                        <Button title="Back" type="invert" navi={'/home'} />
                        <Button title="Upload Images" type="primary" onClick={() => setShowModal(true)} />
                        <Button title="Find Images" type="primary" onClick={() => setShowModalSearch(true)} />
                        {/* <div>
                            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={handleImageChange} multiple />
                            <Button title="Update" type="primary" onClick={handleFindFace} />
                        </div> */}


                    </div>

                    <div className='flex justify-center my-10'>
                        <h1 className='text-lg md:text-4xl mb-5 font-bold flex uppercase'>{project?.p_name} </h1>
                    </div>

                    {
                        newComponent ? <div >
                            <h1 className='text-xl md:text-2xl font-semibold m-5'>Got some matcing faces</h1>
                            <div className='grid grid-cols-3 gap-5 mb-10'>
                            {
                                foundFaces.map((face, index) => (

                                    
                                    <img key={index} src={`${baseURL}/api/gridfs/${face}?jwt=${sessionStorage.getItem('token')}`} alt={`Image ${index}`} className="rounded-md w-full" />

                                ))
                            }
                            </div>
                            </div> :
                            null

                    }

                    <div className='bg-white/30 shadow-lg rounded-lg p-10'>

                        {
                            photosLength == 0 ? <div className='flex items-center justify-center'>
                                <h1 className='text-2xl md:text-4xl font-bold'>Pictures Not Found In Project</h1>

                            </div>
                                :
                                <div>
                                    <h1 className='text-2xl md:text-4xl font-semibold m-5'>
                                        All Photos
                                    </h1>
                                    <div className='grid grid-cols-3 gap-5'>
                                    {photos.map((photo, index) => (
                                        <div className=' gap-5'>
                                            <img key={index} src={`${baseURL}/api/gridfs/${photo}?jwt=${sessionStorage.getItem('token')}`} alt={`Image ${index}`} className="rounded-md w-full" />
                                        </div>
                                    ))}
                                    </div>
                                    
                                </div>
                        }

                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProjectPage;

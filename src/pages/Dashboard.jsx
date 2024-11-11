import React, { useEffect, useState } from 'react'
import Header from '../layouts/Header/Header';
import Button from '../style/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProjectInfo from '../components/ProjectInfo';
import CreateProject from '../components/CreateProject';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../components/Loading';
import Modal from '../components/Modal/Modal';

const helloLanguages = [
    "Hello",
    "Bonjour",
    "Hola",
    "Ciao",
    "Namaste",
    "Ni Hao",
]

const Dashboard = () => {

    const [loadingState, setLoadingState] = useState(false);
    const [createProject, setCreateProject] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [greetings, setGreetings] = useState(helloLanguages[Math.floor(Math.random() * helloLanguages.length)]);
    const [userProjects, setUserProjects] = useState([]);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const token = sessionStorage.getItem('token');

    const instance = axios.create({
        // baseURL: 'https://my-flask-app-latest-fbf3.onrender.com',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    useEffect(() => {
        setLoadingState(true);
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/auth');
        }

        instance.get('/auth/profile')
            .then(response => {
                console.log(response);
                setUser(response.data);
                loadProject();
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 401) {

                    console.log(error.response.status);
                    toast.error('Logged Out, Navigating to login page');
                    navigate('/auth');

                }

                else if (error.response.status === 404) {

                    console.log(error.response.status);
                    toast.error('ID has either been deleted or changed, Navigating to login page');
                    navigate('/auth');

                }
                else  {
                    toast.error('Something went wrong, Navigating to login page');
                    navigate('/auth');
                }
            })
    }, []);

    function loadProject() {

        instance.get('/project/user')
            .then(projectsResponse => {
                console.log(projectsResponse.data);
                setUserProjects(projectsResponse.data);
                setLoadingState(false);
            })
            .catch(error => {
                console.log(error);
            })


    }

    const handleCreateProject = () => {
        setCreateProject(!createProject);
        setShowModal(true)
    }

    const handleRefresh = () => {
        setLoadingState(true);
        loadProject();
    }

    const handleProjectDelete = (projectId) => {
        axios.delete(`/project/${projectId}`)
            .then(response => {
                console.log(response);
                setUserProjects(userProjects.filter(project => project.id !== projectId));
                toast.success('Project deleted successfully!');
            })
            .catch(error => {
                console.error(error);
                toast.error('Error deleting project');
            })
    }


    const handleProjectCreate = (input, loadingState) => {
        // e.preventDefault();

        loadingState(true);

        axios.post('/project/create', input)
            .then((response) => {
                const newData = {
                    faces: [],
                    p_name: input.p_name,
                    id: response.data.project_id
                }
                setUserProjects([...userProjects, newData]);
                setShowModal(false);
                toast.success('Project created successfully!');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Error creating project');
            });
        loadingState(false);


    }

    if (loadingState) {
        return (
            <Loading />
        )
    }


    return (
        <div>
            <Header />
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <CreateProject handleSubmit={handleProjectCreate} />
            </Modal>
            <div className='bg-blue-100/50 backdrop-blur-lg p-10 m-5 shadow-xl rounded-xl grid items-start mt-5'>

                <div className='flex flex-col items-center sm:items-start justify-center'>

                    <h1 className='text-lg md:text-3xl font-bold flex'>{greetings}, {user.email} </h1>
                    <div className='flex items-center justify-start gap-4 mt-4'>
                        <Button
                            title={"Create Project"}
                            type={"invert"}
                            sizeText='large'
                            onClick={handleCreateProject}
                        />
                        <div className='justify-self-end'>
                            <Button
                                title={"Refresh"}
                                type={"invert"}
                                sizeText='large'
                                onClick={handleRefresh}
                            />
                        </div>


                    </div>
                </div>




                {/* // <div className='mt-5 z-10 relative' role='dialog'>
                    //     
                     </div> */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
                    {userProjects.length === 0 ?
                        <div className='flex items-center justify-center'>

                            <h1 className='text-xl sm:text-2xl md:text-4xl text-center font-bold mt-10'>No projects found</h1>
                        </div>


                        :

                        userProjects.map((project, index) =>
                            <div key={index} >
                                <ProjectInfo title={project.p_name} image={project.thumb_nail} projectId={project.id} handleProjectDelete={handleProjectDelete} />
                            </div>
                        )
                        //console.log(userProjects)
                    }
                </div>



            </div>
        </div>
    )
}

export default Dashboard

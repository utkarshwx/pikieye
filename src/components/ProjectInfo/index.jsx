import React, { useState } from 'react'
import Button from '../../style/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
// import imageTest from '../../assets/blob-scene-haikei.svg';

const ProjectInfo = ({ title, image, projectId, handleProjectDelete }) => {




    return (
        <div>
            <div className='bg-white shadow-lg rounded-lg px-3 md:px-8 py-3 md:py-5 mt-7'>
                <div className='flex-col'>
                    <img src={image} alt='Profile' className='rounded-lg aspect-[16/9]' />

                </div>
                <div>
                    <h4 className='text-lg md:text-2xl truncate'>{title}</h4>
                    <div className='flex gap-3 justify-end'>
                        <Button title="Show" type="primary" navi={`/project/${projectId}`} />
                        <Button title="Delete" type="danger" onClick={() => { handleProjectDelete(projectId) }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo

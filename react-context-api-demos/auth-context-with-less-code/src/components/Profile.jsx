import useUser from '../contexts/UserContext'

function Profile() {
    const { user, logoutUser } = useUser();

    return (
        <div className='mt-3'>
            {user &&
                <>
                    <h1 className='text-2xl'>Hello {user.username}</h1>

                    <button onClick={() => { logoutUser(); }} className='bg-red-200 cursor-pointer border-2 px-3 py-2 rounded-xl'>Logout</button>
                </>
            }
        </div>
    )
}

export default Profile
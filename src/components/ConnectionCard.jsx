const ConnectionCard = ({requests}) => {
    return <div className="card card-side bg-base-300 shadow-sm w-4/12 h-50">
                <figure>
                    <img
                        src={requests?.photoUrl}
                    alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{requests?.firstName}  {requests?.lastName}</h2>
                    <p>{requests?.about}</p>
                    <p>{requests?.age}, {requests?.gender}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-secondary">Accept</button>
                        <button className="btn btn-primary">Reject</button>
                    </div>
                </div>
            </div>
}

export default ConnectionCard
const ConnectionCard = ({data}) => {
    return <div className="card card-side bg-base-300 shadow-sm w-4/12">
                <figure>
                    <img
                        src={data?.photoUrl}
                    alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{data?.firstName}  {data?.lastName}</h2>
                    <p>{data?.about}</p>
                    <p>{data?.age}, {data?.gender}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-secondary">Accept</button>
                        <button className="btn btn-primary">Reject</button>
                    </div>
                </div>
            </div>
}

export default ConnectionCard
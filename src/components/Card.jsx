const Card = ({ users }) => {
  if (!users) return null; 
  return (
    <div className="card bg-base-300 w-86 shadow-sm p-2">
      <figure>
        <img className="w-full" src={users?.photoUrl} alt="Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{users.firstName} {users.lastName}</h2>
        <p>{users.about}</p>
        {(users.age && users.gender) && <p>{users.age}, {users.gender}</p> }
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

const Card = ({ users }) => {
  if (!users) return null; 
  return (
    <div className="card bg-base-300 w-86 shadow-sm  h-120">
      <figure>
        <img className="w-full" src={users?.photoUrl} alt="Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{users.firstName} {users.lastName}</h2>
        {(users.age && users.gender) && <p>{users.age}, {users.gender}</p> }
        <p>{users.about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

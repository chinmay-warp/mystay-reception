const Card = (props) => {
    return (
      <div className="min-h-[400px] min-w-full xs:w-[400px] rounded-xl flex justify-center place-items-center flex-col gap-5">
        {props.children}
      </div>
    );
  };
  
  export default Card;
  
const ProficiencyCard = ({ image, description }) => {
  return (
    // https://dtd-stylex.vercel.app/assets/premium-quality-lq-dSEIMso4.jpg
    <div className="group flex flex-col w-full lg:w-96  border p-4 bg-gray-100 border-brand-green">
      <img
        src={image}
        alt="img"
        loading="lazy"
        className="rounded group-hover:grayscale transition-all duration-150 object-contain"
      />
      <p className="text-center mt-2 font-semibold">{description}</p>
    </div>
  );
};

export default ProficiencyCard;

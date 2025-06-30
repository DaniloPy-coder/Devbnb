import Perk from "./Perk";

const Perks = ({ perks, setPerks }) => {
  const handleClick = (target) => {
    const newPerks = target.checked
      ? [...perks, target.value]
      : perks.filter((perk) => perk !== target.value);

    setPerks(newPerks);
  };
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4">
      <label
        htmlFor="wifi"
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-4 py-3"
      >
        <input
          type="checkbox"
          checked={perks.includes("wifi")}
          id="wifi"
          value={"wifi"}
          onChange={(e) => handleClick(e.target)}
        />
        <Perk perk={"wifi"} />
      </label>

      <label
        htmlFor="parking"
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-4 py-3"
      >
        <input
          type="checkbox"
          checked={perks.includes("parking")}
          id="parking"
          value={"parking"}
          onChange={(e) => handleClick(e.target)}
        />
        <Perk perk={"parking"} />
      </label>

      <label
        htmlFor="tv"
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-4 py-3"
      >
        <input
          type="checkbox"
          checked={perks.includes("tv")}
          id="tv"
          value={"tv"}
          onChange={(e) => handleClick(e.target)}
        />
        <Perk perk={"tv"} />
      </label>

      <label
        htmlFor="radio"
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-4 py-3"
      >
        <input
          type="checkbox"
          checked={perks.includes("radio")}
          id="radio"
          value={"radio"}
          onChange={(e) => handleClick(e.target)}
        />
        <Perk perk={"radio"} />
      </label>

      <label
        htmlFor="pets"
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-4 py-3"
      >
        <input
          type="checkbox"
          id="pets"
          value={"pets"}
          onChange={(e) => handleClick(e.target)}
        />
        <Perk perk={"pets"} />
      </label>

      <label
        htmlFor="entrance"
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-4 py-3"
      >
        <input
          type="checkbox"
          checked={perks.includes("entrance")}
          id="entrance"
          value={"entrance"}
          onChange={(e) => handleClick(e.target)}
        />
        <Perk perk={"entrance"} />
      </label>
    </div>
  );
};

export default Perks;

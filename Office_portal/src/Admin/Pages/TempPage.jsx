import React from "react";

const TempPage = () => {
  const objects = [
    { title: "Sunset Over the Ocean", description: "A beautiful view of the sun setting over the ocean, with vibrant orange and purple hues filling the sky." },
    { title: "Misty Forest", description: "A dense forest shrouded in mist, with tall trees and soft, diffused light filtering through the fog." },
    { title: "Mountain Adventure", description: "A rugged mountain range with snow-capped peaks, perfect for hiking and outdoor exploration." },
    { title: "City at Night", description: "A bustling city skyline illuminated at night, with lights twinkling and cars moving through the streets." },
    { title: "Tropical Beach", description: "A serene tropical beach with clear blue waters, soft white sand, and palm trees gently swaying in the breeze." },
    { title: "Autumn Leaves", description: "A scenic park during autumn, with trees covered in vibrant red, orange, and yellow leaves falling gently to the ground." },
    { title: "Space Exploration", description: "A futuristic spacecraft soaring through space, surrounded by distant stars and planets in a vast universe." },
    { title: "Ancient Ruins", description: "The remains of an ancient civilization, with crumbling stone structures and mysterious carvings, hidden in the jungle." },
    { title: "Flower Garden", description: "A colorful garden filled with blooming flowers of various shapes and sizes, creating a peaceful and fragrant atmosphere." },
    { title: "Winter Wonderland", description: "A serene snowy landscape with pine trees covered in snow, and a quiet atmosphere in the frosty air." },
    { title: "Desert Oasis", description: "A lush oasis in the middle of a vast desert, with clear water surrounded by palm trees and desert flowers." },
    { title: "Urban Streets", description: "A lively urban street filled with people, shops, and street vendors, bustling with activity during the day." },
    { title: "Rainbow Valley", description: "A colorful valley filled with flowers of every hue, stretching across a vibrant green field beneath a rainbow-filled sky." },
    { title: "Deep Sea Exploration", description: "A deep-sea diving expedition discovering vibrant coral reefs, strange creatures, and clear blue waters beneath the surface." },
    { title: "Volcanic Eruption", description: "A powerful volcanic eruption with molten lava flowing down the mountainside, surrounded by an ash-filled sky." },
    { title: "Northern Lights", description: "The magical aurora borealis dancing across the night sky, with colorful streaks of light illuminating the frozen landscape." },
    { title: "Savannah Safari", description: "A safari in the African savannah, spotting wild animals like lions, giraffes, and elephants amidst golden grasslands." },
    { title: "Giant Waterfall", description: "A massive waterfall crashing down from a great height, surrounded by mist and rainbows in the sunlight." }
  ];

  return (
    <div className="scroll-wrapper">
      <div className="scrolling-container">
        {objects.map((elem, index) => {
          return (
            <div key={index} className="card">
              <h1 className="font-bold">{elem.title}</h1>
              <p>{elem.description}</p>
            </div>
          );
        })}
        {objects.map((elem, index) => {
          return (
            <div key={index + objects.length} className="card">
              <h1 className="font-bold">{elem.title}</h1>
              <p>{elem.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TempPage;

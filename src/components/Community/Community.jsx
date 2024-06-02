import CommunityCard from "../CommunityCard/CommunityCard";
import img1 from "../../assets/CommunityIcon/img (1).png";
import img2 from "../../assets/CommunityIcon/img (2).png";
import img3 from "../../assets/CommunityIcon/img (3).png";
import img4 from "../../assets/CommunityIcon/img (4).png";
import img5 from "../../assets/CommunityIcon/img (5).png";
import img6 from "../../assets/CommunityIcon/img (6).png";

const Community = () => {
  const comminutyContexts = [
    {
      icon: img3,
      title: "Adoption Services",
      subTitle:
        "Our Adoption Services connect you with pets in need. Browse profiles, apply easily, and find the perfect pet to complete your family. Your new best friend awaits!",
    },
    {
      icon: img2,
      title: "Foster Programs",
      subTitle:
        "Our Foster Programs offer temporary homes for pets awaiting adoption. Provide care and love, helping them transition to their forever homes. Make a difference today!",
    },
    {
      icon: img5,
      title: "Lost and Found",
      subTitle:
        "Our Lost and Found service is your trusted resource for reuniting lost pets with their families. browse listings, and help bring beloved companions back home safely.",
    },
    {
      icon: img6,
      title: "Veterinary Care",
      subTitle:
        "Our Veterinary Care ensures pets health and wellness. Offering comprehensive services, including check-ups, vaccinations, and treatments, we prioritize your pets well-being.",
    },
    {
      icon: img4,
      title: "Pet Donations",
      subTitle:
        "Support pets in need through our Pet Donations program. Your contributions provide food, shelter, and medical care, making a difference in their lives. Join us in giving back today.",
    },
    {
      icon: img1,
      title: "Behavioral Training",
      subTitle:
        "Enhance your pets behavior with our Behavioral Training program. Expert trainers provide personalized guidance, helping your furry friend develop positive habits and thrive.",
    },
  ];
  return (
    <div className="grid md:grid-cols-4 gap-5 mt-20 md:px-10 place-items-center">
      <div className="col-span-2">
        <h2 className="text-5xl">Helping Animals, Building Community</h2>
        <p className="text-gray-600 mt-3">
          Et magnis arcu elit elit ipsum. Eget in libero faucibus amet. Arcu,
          aliquam facilisi consequat proin velit sollicitudin non. Risus mauris
          risus molestie mus tellus enim nulla tortor. Ultrices semper dictum.
        </p>
      </div>
      {comminutyContexts.map((item) => (
        <CommunityCard
          key={item.i}
          icon={item.icon}
          heading={item.title}
          subHeading={item.subTitle}
        />
      ))}
    </div>
  );
};

export default Community;

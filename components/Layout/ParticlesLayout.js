import dynamic from "next/dynamic";

const ParticlesBg = dynamic(() => import("particles-bg"), { ssr: false });

const ParticlesLayout = ({children}) => {
    if(typeof window === "undefined") {
        return <div>
            {children}
        </div>;
    }

    return <div>
        {children}
        <ParticlesBg color={"#ababab"} num={20} type={"cobweb"} bg={true} />
    </div>
}

export default ParticlesLayout;

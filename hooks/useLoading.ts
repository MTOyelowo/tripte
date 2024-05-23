import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const useLoading = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        router.isReady && setIsLoading(false);
    }, [router.isReady]);

    return isLoading;

}

export default useLoading;
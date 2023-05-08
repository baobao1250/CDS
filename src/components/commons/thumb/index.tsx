import React, { useEffect, useState } from "react";

const Thumb = (file: any) => {
    const [loading, setLoading] = useState(true);
    const [thumb, setThumb] = useState<any>(undefined);

    useEffect(() => {
        if (!file) {
            return;
        }
        let reader = new FileReader();
        reader.onloadend = () => {
            setLoading(false);
            if (reader.result) {
                setThumb(reader.result);
            }
        };
        if (file.file !== undefined) {
            reader.readAsDataURL(file.file);
        }
        return () => {
            setThumb(undefined);
        };
    }, [file]);

    if (!file) {
        return null;
    }

    if (loading) {
        return null;
    }

    return <>{thumb && <img src={thumb} alt="" style={{ width: 300, height: 300, borderRadius: "50%", margin: 30, cursor: "pointer" }} />}</>;
};

export default Thumb;

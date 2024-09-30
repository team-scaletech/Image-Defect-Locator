import { useState, FC } from "react";
import DentMarker from "./dentmark";
import { EditableValue } from "mendix";

interface Defect {
    x: number;
    y: number;
    note: string;
}

interface ImageData {
    src: string;
    defects: Defect[];
}
interface DefectLocatorProps {
    imageAttribute?: EditableValue<string>;
}
const DefectLocatImage: FC<DefectLocatorProps> = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return; // Prevent further processing

        const newImages = files.map(file => {
            const reader = new FileReader();
            return new Promise<ImageData>(resolve => {
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    resolve({ src: reader.result as string, defects: [] });
                };
                reader.onerror = () => {
                    console.error("File reading failed");
                    resolve({ src: "", defects: [] }); // Handle errors gracefully
                };
            });
        });

        Promise.all(newImages).then(newImageData => {
            setImages(prevImages => [...prevImages, ...newImageData]);
            if (selectedIndex === null && newImageData.length > 0) {
                setSelectedIndex(0);
            }
        });
    };

    const handleThumbnailClick = (index: number) => {
        setSelectedIndex(index);
    };

    const addDefectToImage = (defect: Defect) => {
        if (selectedIndex !== null) {
            setImages(prevImages =>
                prevImages.map((img, idx) =>
                    idx === selectedIndex ? { ...img, defects: [...img.defects, defect] } : img
                )
            );
        }
    };

    return (
        <div className="image-defect-locator">
            <input type="file" accept="image/*" onChange={handleImageUpload} capture="user" multiple />

            {/* Display the main image and defects if any image is selected */}
            {selectedIndex !== null && images[selectedIndex] && (
                <div className="image-container">
                    <DentMarker
                        src={images[selectedIndex].src}
                        defects={images[selectedIndex].defects}
                        addDefect={addDefectToImage}
                    />
                </div>
            )}

            {/* Thumbnails section */}
            <div className="thumbnail-container">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`thumbnail ${selectedIndex === index ? "selected" : ""}`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <img src={image.src} alt={`Thumbnail ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DefectLocatImage;

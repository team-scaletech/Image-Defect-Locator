import { useState, FC, useEffect } from "react";
import DentMarker from "./dentmark";
import { EditableValue } from "mendix";
import { DefectsDataType } from "typings/ImageDefectLocatorProps";

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
    imageData?: EditableValue<string>;
    defectsData?: DefectsDataType[];
}
const DefectLocatImage: FC<DefectLocatorProps> = ({ imageData, defectsData }) => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = Array.from(e.target.files || []);
    //     if (files.length === 0) return; // Prevent further processing

    //     const newImages = files.map(file => {
    //         const reader = new FileReader();
    //         return new Promise<ImageData>(resolve => {
    //             reader.readAsDataURL(file);
    //             reader.onloadend = () => {
    //                 resolve({ src: reader.result as string, defects: [] });
    //             };
    //             reader.onerror = () => {
    //                 resolve({ src: "", defects: [] }); // Handle errors gracefully
    //             };
    //         });
    //     });

    //     Promise.all(newImages).then(newImageData => {
    //         setImages(prevImages => [...prevImages, ...newImageData]);
    //         if (selectedIndex === null && newImageData.length > 0) {
    //             setSelectedIndex(0);
    //         }
    //         // Store the first uploaded image in the Mendix imageData attribute
    //         if (imageData && newImageData.length > 0) {
    //             console.warn("Setting imageData value:", newImageData[0].src);
    //             imageData.setValue(newImageData[0].src);
    //         }
    //     });
    // };
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return; // Prevent further processing

        const newImages = files.map(file => {
            const fileURL = URL.createObjectURL(file); // Create URL for each file
            return { src: fileURL, defects: [] }; // Store each image with its URL
        });

        // Add new images to the existing ones
        setImages(prevImages => [...prevImages, ...newImages]);

        // if (imageData) {
        //     imageData.setValue(newImages[0].src); // Store the JSON string in Mendix
        // }
        if (imageData) {
            const updatedImages = [...images, ...newImages]; // Combine previous and new images
            const imageUrls = updatedImages.map(image => image.src); // Extract URLs
            console.warn(">>>.", imageUrls);
            imageData.setValue(JSON.stringify(imageUrls)); // Store the array as a JSON string in Mendix
        }
        // Select the first image if none is selected
        if (selectedIndex === null && newImages.length > 0) {
            setSelectedIndex(0);
        }
    };

    const handleThumbnailClick = (index: number) => {
        setSelectedIndex(index);
    };

    // const addDefectToImage = (defect: Defect) => {
    //     if (selectedIndex !== null) {
    //         setImages(prevImages =>
    //             prevImages.map((img, idx) =>
    //                 idx === selectedIndex ? { ...img, defects: [...img.defects, defect] } : img
    //             )
    //         );
    //     }

    //     // console.warn("Setting XPosition:", defectsData);
    //     // if (defectsData && selectedIndex !== null) {
    //     //     const newDefectItem = defectsData[selectedIndex];
    //     //     console.warn("Setting YPosition:", defect.y);
    //     //     console.warn("Setting Note:", defect.note);
    //     //     // Set the values of the attributes
    //     //     // newDefectItem.XPositionAttribute.setValue(defect.x as any);
    //     //     // newDefectItem.YPositionAttribute.setValue(defect.y as any);
    //     //     newDefectItem.noteAttribute.setValue(defect.note);
    //     // }
    // };
    const addDefectToImage = (defect: Defect) => {
        if (selectedIndex !== null) {
            // Update the image with the new defect
            const updatedImages = images.map((img, idx) =>
                idx === selectedIndex ? { ...img, defects: [...img.defects, defect] } : img
            );

            // Update the state
            setImages(updatedImages);
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

import {errors} from '../validations';
import storage from '@react-native-firebase/storage';

export const handleInputChange = (
    value,
    setInputValue,
    validator,
    currentState,
    setError,
    invalidState,
) => {
    if (
        (validator(value) && currentState === invalidState) ||
        value.length === 0
    ) {
        setError(errors.valid);
    } else if (!validator(value) && currentState === errors.valid) {
        setError(invalidState);
    }
    setInputValue(value);
};

export const persistPhoto = async (storagePath, filePath) => {
    const endPath = storage().ref(storagePath);
    await endPath
        .putFile(filePath)
        .then(() => true)
        .catch((e) => false);
};

export const getPhotoDownloadUrl = async (storagePath) => {
    try {
        const url = await storage().ref(storagePath).getDownloadURL();
        return url;
    } catch (err) {
        return null;
    }
};

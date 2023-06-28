import { useState } from "react";

export default function useLocalStorage(key, initialValue = null) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            if (!item) {
                return initialValue;
            }

            const itemObject = JSON.parse(item);
            if (itemObject.expirationTime <= new Date().getTime()) {
                return initialValue;
            }

            return itemObject.value;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value, expirationTime = 3600) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                const withExpiration = {
                    value: valueToStore,
                    expirationTime: (new Date().getTime() + expirationTime * 1000)
                }

                window.localStorage.setItem(key, JSON.stringify(withExpiration));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}
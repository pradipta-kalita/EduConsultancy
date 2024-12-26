export const loadScript = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.type = "text/javascript";
        script.async = true;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load razorpay script:`));

        document.body.appendChild(script);
    });
};

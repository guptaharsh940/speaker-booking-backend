const otpMap = new Map();

export function setOtp(id:number, otp:number){
    otpMap.set(id,otp);
}

export function getOtp(id:number){
    const otp = otpMap.get(id);
    otpMap.delete(id);
    return otp;
}

import fp from "fingerpose";

export const paperGesture = new fp.GestureDescription("paper");

paperGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
paperGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
paperGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
paperGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
paperGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

export const scissorGesture = new fp.GestureDescription("scissor");

scissorGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
scissorGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
scissorGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
scissorGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
scissorGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
scissorGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

export const rockGesture = new fp.GestureDescription("rock");

rockGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
rockGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
rockGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
rockGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
rockGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
rockGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

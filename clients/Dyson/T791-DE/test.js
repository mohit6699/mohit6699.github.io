export const sendInteractionTrackingEvent = async (
  screenMsg: TargetTypes.ITargetMessage,
  decisionScope: string,
  internalCampaignData?: IBangkokbank,
) => {
  const decisionScopeDailyVisiting = new DecisionScope(decisionScope);
  const scopeDetails = decisionScopeDailyVisiting.getName();
  const {propositionData} = screenMsg;
  const offerJson = propositionData?.get(scopeDetails)?.items[0];
  const proposition = propositionData?.get(scopeDetails);
 
  if (proposition && offerJson) {
    const offer = new Offer(offerJson);
    offer
      .generateDisplayInteractionXdm(proposition)
      .then(async generateDisplayInteractionXdmValue => {
        const generateDisplayInteractionXdmVal = generateDisplayInteractionXdmValue;
        const data = {
          _bangkokbank: await getBblEdgeData(internalCampaignData),
        };
        const experienceEventTargetTracking = new ExperienceEvent({
          xdmData: {...generateDisplayInteractionXdmVal, ...data},
        });
        if (experienceEventTargetTracking) {
          await sendEdgeEvent(experienceEventTargetTracking || {});
        }
      });
  }
};
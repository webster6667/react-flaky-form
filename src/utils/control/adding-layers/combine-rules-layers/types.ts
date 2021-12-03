import { ValidatorsRulesList } from '@common-types';

export type CombineRulesLayers = (
  bottomLayer: ValidatorsRulesList,
  upperLayer: ValidatorsRulesList,
) => ValidatorsRulesList;

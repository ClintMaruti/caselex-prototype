export interface CaseLexOutPut {
    output: string;
}

export interface Chat {
    input: string;
    context: {
        input: string;
        chat_history: Array<AiChat | HumanChat>;
        context: Array<Context>;
        answer: string;
    };
    // answer: string;
}

export interface AiChat {
    lc_serializable: boolean;
    lc_kwargs: {
        content: string; // "hi",
        additional_kwargs: object;
        response_metadata: object;
    };
    lc_namespace: string[];
    content: string; // "hi",
    additional_kwargs: object;
    response_metadata: object;
    tool_calls: [];
    invalid_tool_calls: [];
}

export interface HumanChat {
    lc_serializable: boolean;
    lc_kwargs: {
        content: string; // "hi",
        additional_kwargs: object;
        response_metadata: object;
    };
    lc_namespace: string[];
    content: string; // "hi",
    additional_kwargs: object;
    response_metadata: object;
}

export interface Context {
    pageContent: string;
    metadata: {
        source: string;
    };
}

export type ChatHistory =
    | { AiChat: string }
    | {
          HumanChat: string;
      };

type Dataset = {
  label: string;
  data: number[] | undefined;
  borderColor: string;
  backgroundColor: string;
};

type GraphData = {
  labels: string[] | undefined;
  datasets: Dataset[];
};

export type GraphProps = {
  data: GraphData;
  title?: string;
};

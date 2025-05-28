import * as kafkaLib from '@confluentinc/kafka-javascript';
import { BaseRpcContext } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

type ConfluentKafkaContextArgs = [
  message: KafkaMessage,
  partition: number,
  topic: string,
  consumer: kafkaLib.KafkaJS.Consumer,
  heartbeat: () => Promise<void>,
  producer: kafkaLib.KafkaJS.Producer,
];

export class ConfluentKafkaContext extends BaseRpcContext<ConfluentKafkaContextArgs> {
  constructor(args: ConfluentKafkaContextArgs) {
    super(args);
  }

  /**
   * Returns the reference to the original message.
   */
  getMessage(): KafkaMessage {
    return this.getArgByIndex(0) as KafkaMessage;
  }

  /**
   * Returns the partition.
   */
  getPartition(): number {
    return this.getArgByIndex(1) as number;
  }

  /**
   * Returns the name of the topic.
   */
  getTopic(): string {
    return this.getArgByIndex(2) as string;
  }

  /**
   * Returns the Kafka consumer reference.
   */
  getConsumer(): kafkaLib.KafkaJS.Consumer {
    return this.getArgByIndex(3) as kafkaLib.KafkaJS.Consumer;
  }

  /**
   * Returns the Kafka heartbeat callback.
   */
  getHeartBeat(): () => Promise<void> {
    return this.getArgByIndex(4) as () => Promise<void>;
  }

  /**
   * Returns the Kafka producer reference.
   */
  getProducer(): kafkaLib.KafkaJS.Producer {
    return this.getArgByIndex(5) as kafkaLib.KafkaJS.Producer;
  }
}

export {};
